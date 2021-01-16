import { useState, useEffect } from 'react';
import sent from '../../assets/sent.svg';
import MsgCard from './MsgCard';

const SentMsg = () => {
    
    const [msg, setMsg] = useState([]);
    const [render, setRender] = useState(false);
    const [alert, setAlert] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(async () => {
        const url = "http://localhost:5000/msg";
        const res = await fetch(url);
        setMsg(await res.json());
    }, [render])
    
    function newMsg(event) {
        event.preventDefault();
        let form = {"name_msg": name,
                    "msg": message};
        const url = "http://localhost:5000/msg/";
        fetch(url, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }).then((res) => res.json()).then((data) => {
            setRender(!render);
            setAlert(data)

            setTimeout(() => {
                setAlert(false);
            }, 1000)
        })

        setName('');
        setMessage('');
        
    }
    
    return(
        <>
            <div className="row justify-content-center mt-1">
                <h2 className="text-light">Fale conosco</h2>
                <form className="col-12" onSubmit={newMsg}>
                    <div className="form-group">
                        <label className="text-light">Nome</label>
                            <input type="text" className="form-control" id="nome" name="name" placeholder="Digite seu nome" value={name} onChange={event=>setName(event.target.value)}/>
                                
                    </div>
                    <div className="form-group">
                        <label className="text-light">Mensagem</label>  
                            <textarea className="form-control" id="msg" rows="3" name="msg" placeholder="Digite sua mensagem" value={message} onChange={event=>setMessage(event.target.value)}/>
                                
                    </div>
                    <button className="btn btn-primary col-xl-12"><img src={sent}/> Enviar</button>
                </form>

                { alert && <div className="alert alert-success alert-dismissible fade show" role="alert">
                            Mensagem enviada!
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div> }
            </div>
            <div className="mt-1">
                {msg.map(row => {
                    return(
                        <span key={row.id}>
                            <MsgCard author={row.name_msg} date={row.date}>{row.msg}</MsgCard>
                        </span>
                    )
                })}
            </div>
        </>
    )
}

export default SentMsg;
