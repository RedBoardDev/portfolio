import type { Experience } from "@/data/experiences"
import { ContentBox } from "@/components/ui/content-box"
import { ProfileImage } from "@/components/ui/profile-image"
import { ExperiencePosition } from "@/components/experience/experience-position"
import SkillSummary from "@/components/shared/skill-summary"

interface ExperienceCompanyCardProps {
  experience: Experience
}

// Fonction pour fusionner les compétences de toutes les positions
const mergeSkills = (experience: Experience): string[] => {
  const allSkills = experience.positions.flatMap((position) => position.skills || [])
  // Éliminer les doublons
  return [...new Set(allSkills)]
}

export function ExperienceCompanyCard({ experience }: ExperienceCompanyCardProps) {
  // Fusionner toutes les compétences des positions
  const companySkills = mergeSkills(experience)

  return (
    <ContentBox withHoverEffect={false}>
      <div className="flex items-center mb-5">
        <ProfileImage
          src={experience.logo || "/placeholder.svg"}
          alt={experience.company}
          size="lg"
          shape="rounded"
          className="mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{experience.company}</h3>
          <p className="text-sm text-gray-600">{experience.totalDuration}</p>
        </div>
      </div>

      <div className="mb-4">
        {experience.positions.map((position, posIndex) => (
          <ExperiencePosition
            key={posIndex}
            position={position}
            isLast={posIndex === experience.positions.length - 1}
          />
        ))}
      </div>

      {/* Compétences au niveau de l'entreprise */}
      {companySkills.length > 0 && (
        <div className="pt-3 border-t border-gray-200">
          <SkillSummary skills={companySkills} maxDisplay={3} />
        </div>
      )}
    </ContentBox>
  )
}
