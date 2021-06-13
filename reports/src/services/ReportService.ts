import { getManager } from 'typeorm';

const bestSelling = async (numberOfResults: number) => {
  const limit = numberOfResults || 5;
  const result = await getManager().query(
    `
    SELECT pr.id, pr.name, sum(quantity) 
    FROM product pr JOIN purchase pu ON pu."productId"=pr.id 
    GROUP BY pr.id 
    ORDER BY sum(quantity) DESC
    LIMIT $1
  `,
    [limit]
  );
  return result;
};

const mostValuable = async (numberOfResults: number) => {
  const limit = numberOfResults || 5;
  const result = await getManager().query(
    `
    SELECT pr.id, pr.name, sum(total) 
    FROM product pr JOIN purchase pu ON pu."productId"=pr.id 
    GROUP BY pr.id 
    ORDER BY sum(total) DESC
    LIMIT $1
  `,
    [limit]
  );
  return result;
};

export default {
  bestSelling,
  mostValuable,
};
