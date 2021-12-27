import { Request } from 'express'
import moment from 'moment'
import { get } from 'lodash'
import CryptoJS from 'crypto-js'
import Constant from '../constants/Constant'
import { IAuth } from '../types/AuthType'

export const checkReqAuth = (req: Request) => {
  // return true
  // Don't check auth, for testing (if needed)
  if(get(req, 'query.noAuth') == 1) return true

  const serverUrl = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}`
  const { Signature, clientTime } = req.query as unknown as IAuth

  // Check time diff
  const serverTime = moment()
  const timeDiff = serverTime.diff(moment.unix(clientTime), 'seconds')
  
  // Generate signature
  const serverSignature = CryptoJS.MD5(clientTime + get(process, 'env.SALT') + serverUrl).toString()

  // Check if timeDiff is under or equal 3 seconds and if signature between client and server is matched
  return timeDiff <= Constant.MAX_REQ_SECONDS_DIFFERENCE && Signature === serverSignature
}