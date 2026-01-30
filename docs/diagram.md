```mermaid
flowchart TD
  Home["/ (Home)"] --> Categorias["12 Categorias"]
  Home --> SignIn["/sign-in"]
  Home --> Login["/login"]

  Categorias --> Alimentos["/alimentos"]
  Categorias --> Vivienda["/vivienda"]
  Categorias --> Asesoria["/asesoria_legal"]
  Categorias --> Transporte["/transporte"]
  Categorias --> Escuela["/escuela"]
  Categorias --> UnAmigo["/un_amigo"]
  Categorias --> Doctor["/doctor"]
  Categorias --> Telefono["/telefono_movil"]
  Categorias --> Trabajo["/trabajo"]
  Categorias --> Cuenta["/cuenta_bancaria"]
  Categorias --> Ropa["/ropa_muebles"]
  Categorias --> Iglesia["/iglesia"]

  SignIn --> Users["/users"]
  Login --> Users

  Users --> NeedHelp["/needhelp"]
  Users --> OfferHelp["/offerhelp"]
```
