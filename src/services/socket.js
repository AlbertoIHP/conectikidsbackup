import SocketIOClient from 'socket.io-client'
import { base } from './base'

export const socket = SocketIOClient( base.base )