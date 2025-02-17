import React from "react";

const ModalWrapper = ({ isOpen, onClose, title, children }) => {
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            {/* Nền đen mờ */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose} // Click ra ngoài để đóng modal
            ></div>

            {/* Nội dung Modal */}
            <div
                className={`relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 ${
                    isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
            >
                {/* Nút đóng */}
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
                    ✕
                </button>

                {/* Tiêu đề */}
                {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}

                {/* Nội dung truyền vào */}
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
};

export default ModalWrapper;
