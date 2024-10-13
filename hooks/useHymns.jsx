import { useState, useMemo, useCallback } from 'react';

export function useHymns(himnos, jovenes, himnario, suplementario) {
  const [tipoHimnario, setTipoHimnario] = useState('todos');

  const mapeos = useMemo(() => {
    const crearMapeo = (items, prefijo) =>
      new Map(items.map((item) => [item.himnoId, `${prefijo}${item.numero}`]));
    return {
      jovenes: crearMapeo(jovenes, 'J'),
      himnario: crearMapeo(himnario, 'H'),
      suplementario: crearMapeo(suplementario, 'S'),
    };
  }, [jovenes, himnario, suplementario]);

  const obtenerIdsYNumeros = useMemo(() => {
    if (tipoHimnario !== 'todos') {
      return Array.from(mapeos[tipoHimnario], ([id, numero]) => ({
        id,
        numero,
      }));
    }

    return himnos.map((item) => {
      const numeros = [
        mapeos.jovenes.get(item.id),
        mapeos.himnario.get(item.id),
        mapeos.suplementario.get(item.id),
      ].filter(Boolean);

      return {
        id: item.id,
        numero: numeros.length > 0 ? numeros.join(', ') : null,
      };
    });
  }, [tipoHimnario, mapeos, himnos]);

  const filtrarHimnos = useCallback(
    (input) => {
      const inputLower = input.toLowerCase();
      return himnos.filter((himno) => {
        const numero = obtenerIdsYNumeros.find(
          (item) => item.id === himno.id,
        )?.numero;

        if (numero === undefined) return false;

        return (
          himno.titulo?.toLowerCase().includes(inputLower) ||
          numero?.toLowerCase().includes(inputLower) ||
          himno?.letra.toLowerCase().includes(inputLower)
        );
      });
    },
    [obtenerIdsYNumeros, himnos],
  );

  return {
    tipoHimnario,
    setTipoHimnario,
    obtenerIdsYNumeros,
    filtrarHimnos,
  };
}
