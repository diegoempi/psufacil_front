export class User{
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public email: string,
        public region: string,
        public comuna: string,
        public colegio: string,
        public fecha_de_nacimiento: string,
        public codigo_psu: string,
        public fecha_de_creacion: string,
        public password: string,
        public rut: string,
        public digito_verificador: string,
        public telefono:string,
        public nombreApoderado: string,
        public apellidosApoderado: string,
        public emailApoderado: string,
        public telefonoApoderado: string,
        public role: string
    ){}
}