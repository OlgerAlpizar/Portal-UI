import defaultAvatar from '../../assets/images/default_avatar.png'

export const getUserAvatar = (image?: string) => 
  image ? image : defaultAvatar