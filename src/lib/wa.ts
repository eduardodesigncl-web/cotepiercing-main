import { SITE } from "./site";

export const WA_NUMBER = SITE.whatsappNumber;

export const waLink = (msg?: string) => {
  const text =
    msg ??
    `Hola María José, quiero reservar una hora.
Nombre:
Edad:
Servicio o piercing que quiero:
Zona:
Fecha u horario ideal:
¿Es primera vez que me perforo esa zona?:
Comentarios:`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
};
