import toast from 'react-hot-toast'

const Toast = {
    Success: (msg: string) =>{
        toast.success(msg,{
            duration: 3000,
            position: 'top-center',
            style: {
                backgroundColor: 'green',
                color: 'white   ',
                padding: '5px',
                paddingLeft: '15px',
                paddingRight: '15px',
                borderRadius: '5px',
                fontSize: '1rem',
                fontFamily: 'sans-serif',
            },
        })
    },
    Error: (msg: string) =>{
        toast.error(msg,{
            duration: 3000,
            position: 'top-center',
            style: {
                backgroundColor: 'red',
                color: 'white   ',
                padding: '5px',
                paddingLeft: '15px',
                paddingRight: '15px',
                borderRadius: '5px',
                fontSize: '1rem',
                fontFamily: 'sans-serif',
            },
        })
    },
    Info: (msg: string) =>{
        toast(msg,{
            duration: 3000,
            position: 'top-center',
            style: {
                backgroundColor: 'blue',
                color: 'white   ',
                padding: '5px',
                paddingLeft: '15px',
                paddingRight: '15px',
                borderRadius: '5px',
                fontSize: '1rem',
                fontFamily: 'sans-serif',
            },
        })
    }

}

export default Toast