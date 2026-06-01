import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import '../styles/ReadProprietario.css';

const ReadProprietario = () => {
    const { id } = useParams();
    const [proprietario, setProprietario] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8081/proprietario/" + id)
            .then(res => {
                console.log(res);
                setProprietario(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="read-container">
            <h1>Detalhes do Proprietário</h1>
            <table className="read-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Placa</th>
                        <th>Ano</th>
                        <th>Mensalidade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="ID">{proprietario._id}</td>
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
                    </tr>
                </tbody>
            </table>
            <div className="read-link">
                <Link to="/">Listar Proprietários</Link>
            </div>
        </div>
    );
};

export default ReadProprietario;