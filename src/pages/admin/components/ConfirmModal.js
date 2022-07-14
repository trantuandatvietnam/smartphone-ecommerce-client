import React from 'react';
import { Button, Modal } from 'antd';

const ConfirmModal = ({ handleRemoveAllProductsSlected, setShowConfirmModal, showConfirmModal }) => {
    return (
        <Modal
            title="Xác nhận lựa chọn của bạn"
            visible={showConfirmModal}
            onCancel={() => setShowConfirmModal(false)}
            footer={[
                <Button onClick={() => setShowConfirmModal(false)} key="cancel" type="primary">
                    Không
                </Button>,
                <Button key="delete" type="danger" onClick={() => handleRemoveAllProductsSlected()}>
                    Xóa
                </Button>,
            ]}
        >
            <span>Bạn có muốn xóa những sản phẩm đã chọn?</span>
        </Modal>
    );
};

export default ConfirmModal;
