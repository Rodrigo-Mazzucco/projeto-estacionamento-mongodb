import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ListProprietario.css';

const ListProprietario = () => {
    const [proprietarios, setProprietarios] = useState([]);

    useEffect(() => {
        const fetchAllProprietarios = async () => {
            try {
                const res = await axios.get("http://localhost:8081/proprietario");
                setProprietarios(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProprietarios();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/proprietario/${id}`);
            setProprietarios((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='container'>
            <h2>Listando Proprietários</h2>
            <div>
                <p>
                    <Link to="/addProprietario" className='btn btn-success btn-add'>
                        Adicionar novo Proprietário
                    </Link>
                </p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Placa</th>
                            <th>Ano</th>
                            <th>Mensalidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proprietarios.map((proprietario) => (
                            <tr key={proprietario._id}>
                                <td data-label="Nome">{proprietario.nome}</td>
                                <td data-label="CPF">{proprietario.cpf}</td>
                                <td data-label="Placa">
                                    {proprietario.veiculos?.map((v, index) => (
                                        <div key={index}>{v.placa}</div>
                                    ))}
                                </td>
                                <td data-label="Ano">
                                    {proprietario.veiculos?.map((v, index) => (
                                        <div key={index}>{v.ano}</div>
                                    ))}
                                </td>
                                <td data-label="Mensalidade">
                                    {proprietario.veiculos?.map((v, index) => (
                                        <div key={index}>{v.mensalidade}</div>
                                    ))}
                                </td>
                                <td data-label="Ações">
                                    <Link to={`/readProprietario/${proprietario._id}`} className="btn btn-success">Ler</Link>
                                    <Link to={`/updateProprietario/${proprietario._id}`} className="btn btn-info">Editar</Link>
                                    <button onClick={() => handleDelete(proprietario._id)} className="btn btn-danger">Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListProprietario;