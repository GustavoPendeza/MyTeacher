import { Button } from "@mui/material"
import { Teacher } from "../../@types/teacher"
import { FormatadorService } from "../../services/FormatadorService"
import { Description, EmptyList, Information, ListItem, ListStyled, Name, Photo, Value } from "./List.style"

interface ListaProps {
    teachers: Teacher[],
    onSelect: (teacher: Teacher) => void
}

const List = (props: ListaProps) => {
    return (
        <div>
            {props.teachers.length > 0 ? (
                <ListStyled>
                    {props.teachers.map(teacher => (
                        <ListItem key={teacher.id}>
                            <Photo src={teacher.photo}></Photo>
                            <Information>
                                <Name>{teacher.name}</Name>
                                <Value>{FormatadorService.valorMonetario(teacher.value)} por hora</Value>
                                <Description>{FormatadorService.limitarTexto(teacher.description, 200)}</Description>
                                <Button sx={{ width: '70%' }} onClick={() => props.onSelect(teacher)}>Marcar Aula com {teacher.name}</Button>
                            </Information>
                        </ListItem>
                    ))}
                </ListStyled>
            ) : (
                <EmptyList>Nenhum item encontrado</EmptyList>
            )}

        </div>
    )
}

export default List