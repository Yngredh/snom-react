export interface Permission {
    id: number,
    description: string
}

export const defaultPermission: Permission[] = [
    {
        id: 1,
        description: 'Gerenciamento total de treinamentos'
    },
    {
        id: 2,
        description: 'Gerenciamento parcial de treinamentos'
    },
    {
        id: 3,
        description: 'Nenhuma'
    }
]