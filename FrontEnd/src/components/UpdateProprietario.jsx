import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../styles/UpdateProprietario.css';

function UpdateProprietario() {
    const { id } = useParams();
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

    useEffect(() => {
        axios.get("http://localhost:8081/proprietario/" + id)
            .then(res => {
                const data = res.data;
                // Normaliza os veículos
                data.veiculos = data.veiculos?.map(v => ({
                    placa: v.placa || "",
                    ano: v.ano || "",
                    mensalidade: v.mensalidade || ""
                })) || [{ placa: "", ano: "", mensalidade: "" }];
                setProprietario(data);
            })
            .catch(err => console.log(err));
    }, [id]);


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
            await axios.put(`http://localhost:8081/proprietario/${id}`, {
                nome: proprietario.nome,
                cpf: proprietario.cpf,
                veiculos: proprietario.veiculos
            });

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="update-container">
            <h1>Formulário para Editar o Proprietário</h1>
            <form className="update-form">
                <div>
                    <label className="update-form-label">ID:</label>
                    <input
                        type="text"
                        className="update-form-control"
                        id="_id"
                        name="_id"
                        placeholder="ID"
                        value={proprietario._id ?? ""}
                        disabled
                    />
                </div>
                <div>
                    <label className="update-form-label">Nome:</label>
                    <input
                        type="text"
                        className="update-form-control"
                        id="nome"
                        name="nome"
                        placeholder="Nome do Proprietário"
                        value={proprietario.nome ?? ""}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="update-form-label">CPF:</label>
                    <input
                        type="text"
                        className="update-form-control"
                        id="cpf"
                        name="cpf"
                        placeholder="CPF do Proprietário"
                        value={proprietario.cpf ?? ""}
                        onChange={handleChange}
                    />
                </div>
                {proprietario.veiculos.map((v, index) => (
                    <div key={index} className="update-veiculo-card">
                        <div>
                            <label>Placa:</label>
                            <input
                                type="text"
                                className="update-form-control"
                                name="placa"
                                value={v.placa ?? ""}
                                onChange={(e) => handleVehicleChange(index, e)}
                            />
                        </div>
                        <div>
                            <label>Ano:</label>
                            <input
                                type="text"
                                className="update-form-control"
                                name="ano"
                                value={v.ano ?? ""}
                                onChange={(e) => handleVehicleChange(index, e)}
                            />
                        </div>
                        <div>
                            <label>Mensalidade:</label>
                            <input
                                type="text"
                                className="update-form-control"
                                name="mensalidade"
                                value={v.mensalidade ?? ""}
                                onChange={(e) => handleVehicleChange(index, e)}
                            />
                        </div>
                        <button
                            type="button"
                            className="update-btn update-btn-danger"
                            onClick={() => removeVehicle(index)}
                            disabled={proprietario.veiculos.length === 1}
                        >
                            Remover Veículo
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="update-btn update-btn-secondary"
                    onClick={addVehicle}
                >
                    + Adicionar Veículo
                </button>
                <button
                    type="submit"
                    className="update-btn update-btn-primary"
                    onClick={handleClick}
                >
                    Alterar
                </button>
            </form>
            <div className="update-link">
                <Link to="/">Veja todos os proprietários</Link>
            </div>
        </div>
    );
}

export default UpdateProprietario;