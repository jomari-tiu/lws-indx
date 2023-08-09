import React from "react";
import TreatmentPlanPrintTable from "@src/components/PrintTables";
import PrintTemplate from "@src/components/PrintTemplate";

export default function Print({ patient, page, tableData }: any) {
  const patientRecord = JSON.parse(patient);
  const tableDataRecord = JSON.parse(tableData);
  return (
    // <div className=" w-full h-screen overflow-auto">
    <div className="flex items-center flex-col ">
      <div className="w-[90%] max-w-[1366px]">
        <PrintTemplate patientRecord={patientRecord}>
          <h1 className=" text-[24px] mb-[15px] capitalize">{page}</h1>
          {page === "treatment plan" && (
            <TreatmentPlanPrintTable data={tableDataRecord} />
          )}
        </PrintTemplate>
      </div>
    </div>
    // </div>
  );
}

export async function getServerSideProps({ query }: any) {
  const patient = query.patient;
  const page = query.page;
  const tableData = query.tableData;
  return {
    props: {
      patient: patient,
      page: page,
      tableData: tableData,
    },
  };
}
