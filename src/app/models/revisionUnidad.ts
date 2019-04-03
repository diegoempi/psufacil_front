export class RevisionUnidad{
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public imagen: string,
        public suscripcion: string
    ){}
}

export class RevisionUnidadLista{
    constructor(
        public id:          number,
        public nombre:      string,
        public unidad:      string,
        public suscripcion: string  
    ){}
}
