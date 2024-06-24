export interface IImageListType {
  id?: number
  images_count?: number
  name?: string
  order?: number
}
export interface IImageClassType {
  list: IImageListType[]
  totalCount: number
}
