import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../styles/AddProprietario.css';

const AddProprietario = () => {
    const [proprietario, setProprietario] = useState({
        nome: "",
        cpf: "",
        veiculos: [
            { placa: "", ano: "", mensalidade: "" }
        ]
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProprietario((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleVehicleChange = (index, e) => {
        const { name, value } = e.target;
        const newVeiculos = [...proprietario.veiculos];
        newVeiculos[index][name] = value;
        setProprietario((prev) => ({
            ...prev,
            veiculos: newVeiculos
        }));
    };

    const addVehicle = () => {
        setProprietario((prev) => ({
            ...prev,
            veiculos: [...prev.veiculos, { placa: "", ano: "", mensalidade: "" }]
        }));
    };

    const removeVehicle = (index) => {
        const newVeiculos = proprietario.veiculos.filter((_, i) => i !== index);
        setProprietario((prev) => ({
            ...prev,
            veiculos: newVeiculos
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/proprietario", proprietario);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="add-container">
            <h2>Adicionando Proprietário</h2>
            <form className="add-form" onSubmit={handleClick}>
                <div>
                    <label className="add-form-label">Nome:</label>
                    <input
                        type="text"
                        className="add-form-control"
                        name="nome"
                        value={proprietario.nome}
                        onChange={handleChange}
                        placeholder="Digite o nome do Proprietário"
                    />
                </div>

                <div>
                    <label className="add-form-label">CPF:</label>
                    <input
                        type="text"
                        className="add-form-control"
                        name="cpf"
                        value={proprietario.cpf}
                        onChange={handleChange}
                        placeholder="Digite o CPF do Proprietário"
                    />
                </div>

                <h5>Veículos</h5>
                {proprietario.veiculos.map((v, index) => (
                    <div key={index} className="veiculo-card">
                        <div>
                            <label>Placa:</label>
                            <input
                                type="text"
                                className="add-form-control"
                                name="placa"
                                value={v.placa}
                                onChange={(e) => handleVehicleChange(index, e)}
                            />
                        </div>
                        <div>
                            <label>Ano:</label>
                            <input
                                type="text"
                                className="add-form-control"
                                name="ano"
                                value={v.ano}
                                onChange={(e) => handleVehicleChange(index, e)}
                            />
                        </div>
                        <div>
                            <label>Mensalidade:</label>
                            <input
                                type="text"
                                className="add-form-control"
                                name="mensalidade"
                                value={v.mensalidade}
                                onChange={(e) => handleVehicleChange(index, e)}
                            />
                        </div>
                        <button
                            type="button"
                            className="add-btn add-btn-danger"
                            onClick={() => removeVehicle(index)}
                            disabled={proprietario.veiculos.length === 1}
                        >
                            Remover Veículo
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="add-btn add-btn-secondary"
                    onClick={addVehicle}
                >
                    + Adicionar Veículo
                </button>

                <button type="submit" className="add-btn add-btn-primary">
                    Cadastrar
                </button>

                <div className="add-link">
                    <Link to="/">Listar Proprietários</Link>
                </div>
            </form>
        </div>
    );
};

export default AddProprietario;