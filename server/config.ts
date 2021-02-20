require('dotenv').config()

export const haloTarget = process.env.HALO_TARGET!

export const haloAccessKey = process.env.HALO_ACCESS_KEY!

export const isDev = process.env.NODE_ENV !== 'production'
