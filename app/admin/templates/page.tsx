import CreateNewTemplateCard from '@/components/admin/create-new-template-card'
import TemplateCard from '@/components/admin/template-card'

const templates = [
  {
    id: 1,
    title: 'Template 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
      ' Sed aliquam, quam id tincidunt tincidunt, nunc nisl consectetur' +
      'nunc, non lacinia nisl ligula id nunc. Nulla facilisi. Sed euismod' +
      'ligula a aliquam tincidunt, nunc nisl consectetur nunc, non lacinia' +
      'nisl ligula id nunc. Nulla facilisi. Sed euismod, ligula a aliquam' +
      'tincidunt, nunc nisl consectetur nunc, non lacinia nisl ligula id nunc.' +
      'Nulla facilisi.',
  },
  {
    id: 2,
    title: 'Template 2 - foo bar baz sagfd',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
      ' Sed aliquam, quam id tincidunt tincidunt, nunc nisl consectetur' +
      'nunc, non lacinia nisl ligula id nunc. Nulla facilisi. Sed euismod' +
      'ligula a aliquam tincidunt, nunc nisl consectetur nunc, non lacinia' +
      'nisl ligula id nunc. Nulla facilisi. Sed euismod, ligula a aliquam' +
      'tincidunt, nunc nisl consectetur nunc, non lacinia nisl ligula id nunc.' +
      'Nulla facilisi.',
  },
  {
    id: 3,
    title: 'Template 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
      ' Sed aliquam, quam id tincidunt tincidunt, nunc nisl consectetur' +
      'nunc, non lacinia nisl ligula id nunc. Nulla facilisi. Sed euismod' +
      'ligula a aliquam tincidunt, nunc nisl consectetur nunc, non lacinia' +
      'nisl ligula id nunc. Nulla facilisi. Sed euismod, ligula a aliquam' +
      'tincidunt, nunc nisl consectetur nunc, non lacinia nisl ligula id nunc.' +
      'Nulla facilisi.',
  },
]

export default function TemplatesPage() {
  return (
    <div className="">
      <h1 className="mb-[15px] text-[24px] font-bold">Templates</h1>
      <div className="grid grid-cols-1 gap-[8px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CreateNewTemplateCard />
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            description={template.description}
            id={template.id}
          />
        ))}
      </div>
    </div>
  )
}
