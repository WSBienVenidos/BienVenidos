import { render } from "@testing-library/react";
import Home from "./page";
import LoginPage from "./login/page";
import SignUpPage from "./sign-up/page";
import AlimentosPage from "./alimentos/page";
import ViviendaPage from "./vivienda/page";
import AsesoriaLegalPage from "./asesoria_legal/page";
import TransportePage from "./transporte/page";
import EscuelaPage from "./escuela/page";
import UnAmigoPage from "./un_amigo/page";
import DoctorPage from "./doctor/page";
import TelefonoMovilPage from "./telefono_movil/page";
import TrabajoPage from "./trabajo/page";
import CuentaBancariaPage from "./cuenta_bancaria/page";
import RopaMueblesPage from "./ropa_muebles/page";
import IglesiaPage from "./iglesia/page";
import NeedHelpPage from "./needhelp/page";
import OfferHelpPage from "./offerhelp/page";
import UsersPage from "./users/page";

describe("app pages", () => {
  const pages = [
    ["Home", Home],
    ["Login", LoginPage],
    ["SignUp", SignUpPage],
    ["Alimentos", AlimentosPage],
    ["Vivienda", ViviendaPage],
    ["AsesoriaLegal", AsesoriaLegalPage],
    ["Transporte", TransportePage],
    ["Escuela", EscuelaPage],
    ["UnAmigo", UnAmigoPage],
    ["Doctor", DoctorPage],
    ["TelefonoMovil", TelefonoMovilPage],
    ["Trabajo", TrabajoPage],
    ["CuentaBancaria", CuentaBancariaPage],
    ["RopaMuebles", RopaMueblesPage],
    ["Iglesia", IglesiaPage],
    ["NeedHelp", NeedHelpPage],
    ["OfferHelp", OfferHelpPage],
    ["Users", UsersPage],
  ] as const;

  it.each(pages)("renders %s page", (_name, PageComponent) => {
    const { container } = render(<PageComponent />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
