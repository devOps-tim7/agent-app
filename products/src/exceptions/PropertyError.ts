export default class PropertyError {
  property: string;
  value: string;

  constructor(property: string, value: string) {
    this.property = property;
    this.value = value;
  }
}
