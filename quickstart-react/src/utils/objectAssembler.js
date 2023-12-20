import { DataDif } from "../components/DataDif";
import { Overdue } from "../components/Overdue";

//rawData => item.column_values em Portfolio
export function objectAssembler(rawData) {
  var filtro,
    filtroFinal,
    programName,
    program,
    timeline,
    timelineFinal,
    splitTimeline;
  //pega o Status das tasks

  filtro = rawData.find((program) => program.title === "Status");

  filtroFinal = JSON.parse(filtro.additional_info);

  //entra na verificação de "Em progresso"

  if (filtroFinal.label === "Em progresso") {
    // puxa as datas da coluna Planned timeline
    timeline = rawData.find((program) => program.title === "Planned timeline");
    timelineFinal = timeline.text;

    //semi formata as datas

    splitTimeline = timelineFinal.split("-");

    const cleanedDates = splitTimeline.map((dateStr) => dateStr.trim());

    //datas formatadas da forma ideal ( função date )
    const firstDate = new Date(
      `${cleanedDates[0]}-${cleanedDates[1]}-${cleanedDates[2]}`
    );
    const secondDate = new Date(
      `${cleanedDates[3]}-${cleanedDates[4]}-${cleanedDates[5]}`
    );

    //Chama a função DataDif que foi criada
    const dataFinal = DataDif(firstDate, secondDate);

    //Chama a função "Overdue que foi criada"
    const overdueDate = Overdue(secondDate);
    console.log(overdueDate);
    try {
      programName = rawData.find((program) => program.title === "Programa");

      program = JSON.parse(programName.additional_info);
      var programLabel;
      if (program.label === "") {
        programLabel = "Sem informação";
      } else {
        programLabel = program.label;
      }
    } catch (error) {
      console.log(error);
      console.log("programa not found");
    }

    var obj = {};
    var response = [];
    try {
      response.push(dataFinal ? dataFinal : 0);

      response.push(overdueDate ? overdueDate : 0);
      obj[programLabel] = response;
    } catch (error) {
      console.log(error);
      console.log("nao montou o objeto");
    }

    return obj;
  } else {
    return;
  }
}
