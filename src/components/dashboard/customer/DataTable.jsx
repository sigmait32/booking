// import axios from "axios";
// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import "bootstrap/dist/css/bootstrap.css";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "react-toastify";
// import { CSVLink } from "react-csv";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable"; // Only import the AutoTable plugin here



// const DatatableCourse = ({ faqs, handleEdit, refreshFaq }) => {
//     const [search, setSearch] = useState("");
//     const [filteredFaqs, setFilteredFaqs] = useState(faqs);

//     useEffect(() => {
//         const result = faqs.filter(item =>
//             item.title.toLowerCase().includes(search.toLowerCase()) ||
//             item.body.toLowerCase().includes(search.toLowerCase())


//         );
//         setFilteredFaqs(result);
//     }, [search, faqs]);

//     const handleDelete = async (id) => {
//         try {
//             let response = await axios.delete(`/api/lms/frontend/faq/${id}`);
//             if (response.data.success) {
//                 toast.success(response.data.message, { position: "top-center" });
//                 refreshFaq();
//             }
//         } catch (error) {
//             toast.error("Failed to delete FAQ");
//         }
//     };

//     const columns = [
//         { name: "#", selector: row => row.id },
//         // { name: "Category", selector: row => row.catDetail.cat_name },
//         // { name: "Sub Category", selector: row => row.subCatDetail.sub_cat_name },
//         // { name: "Course", selector: row => row.courseDetail.course_name },
//         { name: "Faq Title", selector: row => row.title.substr(0, 50) },
//         { name: "Faq Description", selector: row => row.body.substr(0, 50) },
//         {
//             name: "Action",
//             cell: (row) => (
//                 <>
//                     <button className="btn btn-sm btn-primary" onClick={() => handleEdit(row._id)}>
//                         {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
//                         <i class="fa fa-pencil"></i>
//                     </button>
//                     &nbsp;&nbsp;
//                     <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => {
//                             if (window.confirm("Are you sure you want to delete this item?")) {
//                                 handleDelete(row._id);
//                             }
//                         }}
//                     >
//                         {/* <FontAwesomeIcon icon={faTrash} /> */}
//                         <i class="fa fa-trash"></i>
//                     </button>
//                 </>
//             ),
//         },
//     ];

//     // CSV Headers
//     const csvHeaders = [
//         { label: "Serial No", key: "serialNo" },
//         // { label: "Category", key: "catDetail.cat_name" },
//         // { label: "Sub Category", key: "subCatDetail.sub_cat_name" },
//         // { label: "Course", key: "courseDetail.course_name" },
//         { label: " Title", key: "title" },
//         { label: "Description", key: "body" },
//     ];

//     // CSV Data Mapping
//     const csvData = filteredFaqs.map((item, index) => ({
//         serialNo: index + 1,

//         title: item.title,
//         description: item.body,
//     }));

//     // Function to generate PDF
//     const generatePDF = () => {
//         const doc = new jsPDF();
//         doc.text("FAQ List", 14, 10);

//         const tableColumn = ["#", "Category", "Sub Category", "Course", "Faq Title", "Faq Description"];
//         const tableRows = [];

//         filteredFaqs.forEach((item, index) => {
//             const rowData = [
//                 index + 1,
//                 item.title.substr(0, 50),
//                 item.body.substr(0, 50)
//             ];
//             tableRows.push(rowData);
//         });

//         doc.autoTable({
//             head: [tableColumn],
//             body: tableRows,
//             startY: 20,
//         });

//         doc.save("faq_list.pdf");
//     };

//     const tableStyle = {
//         headCells: {
//             style: {
//                 fontWeight: "bold",
//                 fontSize: "14px",
//                 backgroundColor: "yellow",
//             },
//         },
//     };

//     return (
//         <div>
//             <h3>FAQ List</h3>

//             {/* CSV and PDF Download Buttons */}
//             <div className="mb-2">
//                 <CSVLink data={csvData} headers={csvHeaders} filename={"faq_list.csv"} className="btn btn-success">
//                     Download CSV
//                 </CSVLink>
//                 &nbsp;
//                 {/* <button className="btn btn-danger" onClick={generatePDF}>
//                     Download PDF
//                 </button> */}
//             </div>

//             <DataTable
//                 columns={columns}
//                 customStyles={tableStyle}
//                 data={filteredFaqs}
//                 pagination
//                 fixedHeader
//                 selectableRowsHighlight
//                 highlightOnHover
//                 subHeader
//                 subHeaderComponent={
//                     <input
//                         type="text"
//                         placeholder="Search Here..."
//                         className="form-control"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                 }
//                 subHeaderAlign="right"
//             />
//         </div>
//     );
// };

// export default DatatableCourse;
