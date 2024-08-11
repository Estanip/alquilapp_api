export type FilterOperators<T> = {
  $eq?: T;
  $ne?: T;
  $gt?: T;
  $gte?: T;
  $lt?: T;
  $lte?: T;
  $in?: T[];
  $nin?: T[];
  $exists?: boolean;
  $regex?: string | RegExp;
  $options?: string;
};

export type Filter<T> = {
  [K in keyof T]?: FilterOperators<T[K]>;
};
