import React from 'react';

interface Praktikum {
  name: string;
  studentId: string;
  grade: number;
  subjects: string[];
}

const Praktikum: React.FC<Praktikum> = ({ name, studentId, grade, subjects }) => {
    // Validasi runtime
  const validGrade = grade >= 0 && grade <= 100;
  const hasSubjects = subjects && subjects.length > 0;

  return (
    <div className="w-[350px] rounded-xl overflow-hidden shadow-lg border border-gray-300 bg-white font-sans text-sm">
      {/* Header */}
      <div className="bg-orange-500 text-white flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <h2 className="text-lg font-bold">INSTITUTE NAME</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex p-4">
        {/* Left: Info */}
        <div className="flex-1 space-y-1">
          <p><strong>Student ID:</strong> {studentId || "0123456789"}</p>
          <p><strong>Course:</strong> CSE</p>
          <p><strong>Phone:</strong> 0000 000 00</p>
          <p><strong>Session:</strong> YYYY</p>
          <p>
            <strong>Grade:</strong>{" "}
            {validGrade ? (
              <span>{grade}</span>
            ) : (
              <span className="text-red-500">Invalid grade</span>
            )}
          </p>
          {hasSubjects ? (
            <div>
              <p><strong>Subjects:</strong></p>
              <ul className="list-disc list-inside">
                {subjects.map((subject, idx) => (
                  <li key={idx}>{subject}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-orange-500">No subjects listed</p>
          )}
        </div>

        {/* Right: Avatar */}
        <div className="ml-4">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="avatar"
            className="w-20 h-20 object-cover rounded"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-4 pb-2">
        <p className="text-orange-600 font-semibold text-lg text-right">{name || "Name Here"}</p>

        <div className="my-2 text-center">
          <img
            src="https://barcode.tec-it.com/barcode.ashx?data=1234567890&code=Code128&translate-esc=false"
            alt="barcode"
            className="mx-auto w-40"
          />
          <p className="text-xs text-gray-700 mt-1">1234567890</p>
        </div>

        <p className="text-xs text-gray-600 mt-4 ml-1">Authorize Signature</p>
      </div>
    </div>
  );
};



export default Praktikum;