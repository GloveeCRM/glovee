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

export function fetchTemplateById(id: string | number) {
  const templates = fetchTemplates()
  return templates.find((template) => template.id === id)
}
