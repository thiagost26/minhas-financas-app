import { useForm } from "react-hook-form";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";



const Formulario = () => {

    // alteração no formulario de cep

    const {register, setValue, setFocus, getValues} = useForm();


    const enviar = () => {
        const dados = {
            rua:    getValues('rua'),
            bairro: getValues('bairro'),
            cidade: getValues('cidade'),
            estado: getValues('estado'),
            numero: getValues('numero')
        }

        console.log(dados);
    }


    const checkCep = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        const tamanhoCep = e.target.value;

        
        if(!e.target.value){
            return false;
        }

        if(tamanhoCep.length < 9){
            return false;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setValue('rua', data.logradouro);
                setValue('bairro', data.bairro);
                setValue('cidade', data.localidade);
                setValue('estado', data.uf);
                setFocus('numero');
            })        
        }
        
    
    return (

        <Card title="Busca CEP">
            <div className="row">
                <div className="col-lg-3">
                    <div className="bs-component">
                        <FormGroup label="CEP: *" htmlFor="inputCep">
                            <input  type="text"
                                className="form-control"
                                id="inputCep"
                                name="cep"
                                {...register("cep")}
                                onBlur={checkCep}
                            />
                        </FormGroup>
                    </div>
                </div>
            </div>

                <div className="row">
                    <div className="col-lg-10">
                        <FormGroup label="Rua: *" htmlFor="inputRua">
                            <input  type="text"
                                className="form-control"
                                id="inputRua"
                                name="rua"
                                {...register("rua")}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-lg-2">
                        <FormGroup label="Número: *" htmlFor="inputNumero">
                            <input  type="text"
                                    className="form-control"
                                    id="inputNumero"
                                    name="numero"
                                    {...register("numero")}
                                    />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <FormGroup label="Bairro: *" htmlFor="inputBairro">
                            <input  type="text"
                                    className="form-control"
                                    id="inputBairro"
                                    name="bairro"
                                    {...register("bairro")}
                                    />
                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="Cidade: *" htmlFor="inputCidade">
                            <input  type="text"
                                    className="form-control"
                                    id="inputCidade"
                                    name="cidade"
                                    {...register("cidade")}
                                    />
                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="Estado: *" htmlFor="inputEstado">
                            <input  type="text"
                                    className="form-control"
                                    id="inputEstado"
                                    name="estado"
                                    {...register("estado")}
                                    />
                        </FormGroup>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-6">
                        <button onClick={enviar}  type="button" className="btn btn-success btn-sm">Enviar</button>
                    </div>
                </div>
        </Card>
        
    )
}

export default Formulario