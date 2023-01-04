import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const cambiarPassword = () => {

  const guardarPassword = useAuth()

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    password: "",
    nuevo_password: ""
  })

  const handleSubmit = async e => {
    e.peventDefault()

    if(Object.values(password).some(campo => campo === "")) {
      setAlerta({
        msg: "Todos los Campos son Obligatorios",
        error: true
      })
      return
    }
    if(password.nuevo_password.length < 6) {
      setAlerta({
        msg: "El Password debe tener al menos 6 caracteres",
        error: true
      })
      return
    }
    const respuesta = await guardarPassword(password)

    setAlerta(respuesta)
  }


  const { msg } = alerta;

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {""}<span className="text-slate-600 font-bold">Password</span></p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                {msg && <Alerta alerta={alerta} />}

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="password"
                            placeholder="Escribe tu Password"
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Nuevo Password</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="nuevo_password"
                            placeholder="Escribe tu Nuevo Password"
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Actualizar Password"
                        className="bg-slate-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default cambiarPassword