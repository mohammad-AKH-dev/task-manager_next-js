export type teamMemberType = {
    id: string
    name: string
    email: string
    profile: string
    assignedTo: []
    states: {
        pending: number
        inProgress: number
        complited: number
    }
}

export type teamMembersType = teamMemberType[]