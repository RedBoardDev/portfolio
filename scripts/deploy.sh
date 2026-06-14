#!/usr/bin/env bash
# Deploy the static site:
#   1. provision/update infrastructure via Serverless/CloudFormation (S3 bucket, CloudFront, OAC)
#   2. upload out/ to S3 with the AWS CLI (reliable in CI, unlike the serverless-s3-sync plugin
#      which intermittently fails with S3 RequestTimeout on GitHub runners)
#   3. invalidate the CloudFront distribution
#
# Usage: bash scripts/deploy.sh [stage]   (default: production)
# Region is pinned to match serverless.yml (provider.region default) so the CLI and
# CloudFormation always target the same place; override with DEPLOY_REGION if needed.
set -euo pipefail

STAGE="${1:-production}"
REGION="${DEPLOY_REGION:-us-east-1}"
STACK="portfolio-static-site-${STAGE}"

if [[ ! -d out ]]; then
  echo "::error::out/ not found — run the build first (yarn build)." >&2
  exit 1
fi

echo "==> Deploying infrastructure (stage: ${STAGE}, region: ${REGION})"
yarn serverless deploy --stage "${STAGE}" --region "${REGION}"

get_output() {
  aws cloudformation describe-stacks --stack-name "${STACK}" --region "${REGION}" \
    --query "Stacks[0].Outputs[?OutputKey=='${1}'].OutputValue" --output text
}

BUCKET="$(get_output S3BucketName)"
DISTRIBUTION="$(get_output CloudFrontDistribution)"

if [[ -z "${BUCKET}" || "${BUCKET}" == "None" ]]; then
  echo "::error::Could not resolve the S3 bucket from stack ${STACK} (region ${REGION})." >&2
  exit 1
fi

echo "==> Syncing out/ -> s3://${BUCKET}"
aws s3 sync out "s3://${BUCKET}" --region "${REGION}" --delete --no-progress

if [[ -n "${DISTRIBUTION}" && "${DISTRIBUTION}" != "None" ]]; then
  echo "==> Invalidating CloudFront ${DISTRIBUTION}"
  aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION}" --paths '/*' >/dev/null
fi

echo "==> Deploy complete (stage=${STAGE}, region=${REGION}, bucket=${BUCKET})"
