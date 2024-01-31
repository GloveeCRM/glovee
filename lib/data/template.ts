export function fetchTemplates() {
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
  return templates
}

export async function fetchTemplateById(id: string | number) {
  const templates = fetchTemplates()

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(templates.find((template) => template.id === id))
    }, 2000)
  })
}

export async function fetchCategoriesByTemplateId(id: string | number) {
  const categories = [
    {
      id: 1,
      name: 'Category 1',
      description: 'Category 1 description',
    },
    {
      id: 2,
      name: 'Category 2',
      description: 'Category 2 description',
    },
    {
      id: 3,
      name: 'Category 3',
      description: 'Category 3 description',
    },
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories)
    }, 2000)
  })
}
