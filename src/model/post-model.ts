export type PostRequest = {
  title: string;
  body: string;
  image: string;
  category: number[];
};

interface Category {
  name: string;
}

export type PostResponse = {
  id: number;
  title: string;
  slug: string;
  body: string;
  image: string;
  author: {
    name: string;
    username: string;
  };
  categories: Category[];
};
