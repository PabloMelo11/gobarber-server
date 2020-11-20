interface ITemplateVariables {
  [key: string]: string | number | boolean;
}

export default interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
