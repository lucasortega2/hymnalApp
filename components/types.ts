export type Himno = {
  id: string;
  titulo: string;
  letra: string;
  acorde: string;
};
export type Himnario = {
  himnoId: number;
  numero: number | string;
};

export type HymnsData = {
  hymns: Himno[];
  himnario: Himnario[];
  jovenes: Himnario[];
  suplementario: Himnario[];
};

export type HymnListProps = {
  hymnsData: HymnsData;
};
