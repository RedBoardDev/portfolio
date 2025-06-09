import { experiences } from "@/data/experiences"
import { SectionHeader } from "@/components/ui/section-header"
import { ExperienceCompanyCard } from "@/components/experience/experience-company-card"

export default function ExperienceSection() {
  return (
    <div>
      <SectionHeader title="Expérience" />
      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <ExperienceCompanyCard key={index} experience={experience} />
        ))}
      </div>
    </div>
  )
}
