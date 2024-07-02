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
export interface ICateType {
  name: string
  order: number
}
export interface ImageItem {
  id: number
  url: string
  name: string
  path: string
  create_time: string
  update_time: string
  image_class_id: number
  isChecked?: boolean
}
export interface IImageList {
  list?: ImageItem[]
  totalCount?: number
}
