export function baseCardTypes(): CardType[] {
  return [
    {
      id: "text",
      name: "Text",
      body: "${text}",
      variables: [
        { id: "text", name: "Text", description: "The text to display." },
      ],
      design: "basic",
    },
    {
      id: "color",
      name: "Color",
      body: "${colorcode}",
      variables: [
        { id: "colorcode", name: "Color", description: "The color to display." },
      ],
      design: "withpicture",
    },
    {
      id: "github_repo",
      name: "GitHub Repository",
      body: "${owner}/${repo}",
      variables: [
        { id: "owner", name: "Owner", description: "The owner of the GitHub repository (ex. aelithron in aelithron/visiorganize)." },
        { id: "repo", name: "Repository", description: "The GitHub repository to display (ex. visiorganize in aelithron/visiorganize)." },
      ],
      design: "github_repo",
    },
  ]
}

export type CardType = { id: string, name: string, body: string, variables: CardVariable[], design: CardDesign };
export type CardDesign = "basic" | "withpicture" | "github_repo" | "2cols" ; 
export type CardVariable = { id: string, name: string, description: string }