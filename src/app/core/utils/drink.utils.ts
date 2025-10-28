import { COCKTAIL_IMAGE_API } from "../../../environments/environment";

export class DrinkUtils {

  public static getIngredientList(drink: any): any[] {
    return Object.keys(drink)
      .filter((key: any) => key.startsWith('strIngredient') && drink[key])
      .map((key: any, index: number) => {
        return {
          name: drink[key],
          measure: drink[`strMeasure${index + 1}`],
          image: `${COCKTAIL_IMAGE_API}/${drink[key]}-small.png`,
        }
      });
  }
}