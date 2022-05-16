import { fetchConToken } from "../helper/fetch";
import { scrollToBottom } from "../helper/PrepareEvents";
import { Types } from "../types/Types";

export const UsuariosCargados = (usuarios) => ({
    type: Types.chtUsuariosCargados,
    payload: usuarios
})

export const activeChat = (usuarios) => ({
    type: Types.chtActiveChat,
    payload: usuarios
})

export const activeMessage = (message) => ({
    type: Types.chtActiveMessage,
    payload: message
})

export const sendEmailUserChat = (id) => {
    return async(dispatch, getState) => {
        const {usuarios} = getState().cht

        const {activeUser} = getState().auth

        const user = usuarios?.filter(usuarios => usuarios.id === id)

        if (user[0]?.online === false) {

            const subject = 'Tienes un nuevo mensaje'
    
            const title = 'Una persona del Centro Cristiano El Buen Samaritano quiere darte alguna palabra de Dios'
    
            const descripcion = `Dios te bendiga ${user[0]?.name}, ${activeUser?.name} necesita hablar contigo: https://www.ccbsbonao.com.do/Chat`
    
            const email = 'ccbsrd@gmail.com'
    
            const email2 = user[0]?.email
    
            await fetchConToken('sendEmail', {subject, title, email2, descripcion, email}, 'POST');
        }

    }
}

export const cargarChat = (id) => {
    return async(dispatch, getState) => {

        const {usuarios, chatActivo} = getState().cht

        const imageUserMessage = await usuarios.find(user => user.id === chatActivo)

        const resp = await fetchConToken(`mensaje/${id}`)

        const body = await resp.json()

        dispatch(chatCarga(body.message))
        dispatch(imageMessage(imageUserMessage?.urlImage))

        scrollToBottom('messages')
    }
}

const imageMessage = (image) => ({
    type: Types.chtImageMessage,
    payload: image
})


const chatCarga = (chat) => ({
    type: Types.chtCargarChat,
    payload: chat
})

export const clearChat = () => ({
    type: Types.chtClearState
})

export const isTyping = (typing) => ({
    type: Types.chtTyping,
    payload: typing
})

export const clearChatAtive = () => ({
    type: Types.chtClearChatActive
})


