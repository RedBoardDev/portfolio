import { ContentBox } from "@/components/ui/content-box"
import { ProfileImage } from "@/components/ui/profile-image"
import { DateLocationDisplay } from "@/components/ui/date-location-display"
import SkillSummary from "@/components/shared/skill-summary"
import type { Education } from "@/data/education"

interface EducationCardProps {
  education: Education
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <ContentBox>
      {/* Image carrée en haut à droite */}
      <div className="absolute top-5 right-5">
        <ProfileImage
          src={education.logo || "/placeholder.svg?height=48&width=48"}
          alt={education.institution}
          shape="rounded"
        />
      </div>

      {/* Contenu avec marge à droite pour l'image */}
      <div className="pr-16">
        {/* Title and Degree */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">{education.institution}</h3>
          <p className="text-base text-gray-800">
            {education.degree} <span className="text-gray-400">·</span> {education.field}
          </p>
        </div>

        {/* Date and Location */}
        <DateLocationDisplay
          date={`${education.startDate} - ${education.endDate}`}
          location={education.location}
          className="mt-2"
        />

        {/* Description */}
        {education.description && <p className="text-gray-600 text-sm mt-3 leading-relaxed">{education.description}</p>}

        {/* Skills */}
        {education.skills && education.skills.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <SkillSummary skills={education.skills} />
          </div>
        )}
      </div>
    </ContentBox>
  )
}
