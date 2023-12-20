/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
import mondaySdk from "monday-sdk-js";
import { counter } from "../../utils/counter";
import { objectAssembler } from "../../utils/objectAssembler";
const monday = mondaySdk();

export async function portfolio(ids) {
  const data = [];
  // id board: 4995019610
  await monday
    .api(
      `query {
      boards(ids: ${ids}) {
        name
        items {
          name
          id   
          column_values{
            text
            additional_info
            title
          }
        }
      }
    }`
    )
    .then((res) => {
      res.data.boards.map((variavel) => {
        variavel.items.map((item) => {
          data.push(objectAssembler(item.column_values));
        });
      });
    });

  const finalData = counter(data);

  // finalData.map((item) => console.log(item));

  return finalData;
}
