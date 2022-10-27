export interface IReview {
    payload: string,
    rating: number,
    user: IClubOwner,
}

export interface IClubPhotoPhoto {
    pk: string;
    file: string;
    description: string;
  }
  
export interface IClubList {
    pk: number;
    name: string;
    gu: string;
    city: string;
    price: number;
    rating: number;
    is_owner: boolean;
    photos: IClubPhotoPhoto[];
  }
  
export interface IUser {
    last_login: string;
    username: string;
    email: string;
    date_joined: string;
    avatar: string;
    name: string;
    is_host: boolean;
    gender: string;
    language: string;
    currency: string;
}
  
export interface IClubOwner {
    name: string;
    avatar: string;
    username: string;
  }
  
export interface IAmenity {
    pk: number;
    name: string;
    description: string;
  }

export interface ICategory {
   pk: number;
   name: string;
   kind: string;
}
  
export interface IClubDetail extends IClubList {
    id: number;
    created_at: string;
    updated_at: string;
    locker_room: number;
    toilets: number;
    description: string;
    address: string;
    kind: string;
    is_owner: boolean;
    is_liked: boolean;
    category: ICategory;
    owner: IClubOwner;
    amenities: IAmenity[];
    reviews : IReview[];
    open_time: string;
    close_time: number;
  }