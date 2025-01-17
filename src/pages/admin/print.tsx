import React from "react";
import {
  TreatmentPlanPrintTable,
  PrescriptionPrintTable,
  TreatmentRecordPrintTable,
} from "@src/components/PrintTables";
import PrintTemplate from "@src/components/PrintTemplate";

export default function Print({ patient_id, page, tableData, currency }: any) {
  // const patientRecord = JSON.parse(patient);
  const tableDataRecord = JSON.parse(tableData);
  return (
    // <div className=" w-full h-screen overflow-auto">
    <div className="flex items-center flex-col ">
      <div className="w-[90%] max-w-[1366px]">
        <PrintTemplate patientID={patient_id}>
          <h1 className=" text-[24px] mb-[15px] capitalize">{page}</h1>
          {page === "treatment plan" && (
            <TreatmentPlanPrintTable
              data={tableDataRecord}
              currency={currency}
            />
          )}
          {page === "prescription" && (
            <PrescriptionPrintTable
              data={tableDataRecord}
              currency={currency}
            />
          )}
          {page === "treament record payment" && (
            <TreatmentRecordPrintTable
              data={tableDataRecord}
              currency={currency}
            />
          )}
        </PrintTemplate>
      </div>
    </div>
    // </div>
  );
}

export async function getServerSideProps({ query }: any) {
  const patient_id = query.patient_id;
  const page = query.page;
  const tableData = query.tableData;
  return {
    props: {
      patient_id: patient_id,
      page: page,
      tableData: tableData,
      currency: query.currency,
    },
  };
}
