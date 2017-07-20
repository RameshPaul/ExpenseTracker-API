import socketStream from 'socket.io-stream'
import file from './resources/file'

const emitters = (socket) => ({
  uploadFileProgress: (progress) => {
    socket.emit('upload:file:progress', { progress })
  },
  uploadFileSuccess: (fileId) => {
    socket.emit('upload:file:success', { fileId })
  },
  uploadFileError: (error) => {
    socket.emit('upload:file:error', { error })
  }
})

export default (io) => {
  io.on('connection', (socket) => {
    socketStream(socket).on('upload:file', file.upload(emitters(socket)))
  })
}
