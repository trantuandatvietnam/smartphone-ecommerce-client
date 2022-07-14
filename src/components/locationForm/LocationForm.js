import { useDispatch } from 'react-redux';
import Select from 'react-select';
import useLocationForm from '../../hooks/useLocationForm';
import { updateToast } from '../../redux/slice/toastMessageSlice';

function LocationForm({ setIsShowFormAddAddress, info, setInfo }) {
    // hooks
    const { state, onCitySelect, onDistrictSelect, onWardSelect, onChangeAddressDescription } = useLocationForm(false);
    const dispatch = useDispatch();

    // state
    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard,
        descriptionAddress,
    } = state;

    const onSubmit = (e) => {
        e.preventDefault();
        const { selectedCity, selectedDistrict, selectedWard, descriptionAddress } = state;
        const newAddress = {
            city: selectedCity?.label,
            district: selectedDistrict?.label,
            ward: selectedWard?.label,
            descriptionAddress,
        };
        // validate value of users address
        if (!newAddress.city || !newAddress.district || !newAddress.ward) {
            return;
        }
        // validate quantity of users address
        if (info.address.length >= 3) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'warning',
                    message: 'Bạn chỉ được thiết lập tối đa 3 địa chỉ!',
                })
            );
            return;
        }
        // if this new address already exist then show toast message
        const existAddress = info.address.find(
            (ad) => ad.city === newAddress.city && ad.district === newAddress.district && ad.ward === newAddress.ward
        );
        if (existAddress) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: 'Địa chỉ này đã tồn tại!',
                })
            );
            return;
        }
        const newAddresses = [...info.address, newAddress];
        setInfo({ ...info, address: newAddresses });
    };

    return (
        <form
            onSubmit={onSubmit}
            className="w-11/12 p-5 mt-10 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3"
        >
            <div className="flex flex-col gap-5 mb-8">
                <Select
                    name="cityId"
                    key={`cityId_${selectedCity?.value}`}
                    isDisabled={cityOptions.length === 0}
                    options={cityOptions}
                    onChange={(option) => onCitySelect(option)}
                    placeholder="Tỉnh/Thành"
                    defaultValue={selectedCity}
                />

                <Select
                    name="districtId"
                    key={`districtId_${selectedDistrict?.value}`}
                    isDisabled={districtOptions.length === 0}
                    options={districtOptions}
                    onChange={(option) => onDistrictSelect(option)}
                    placeholder="Quận/Huyện"
                    defaultValue={selectedDistrict}
                />

                <Select
                    name="wardId"
                    key={`wardId_${selectedWard?.value}`}
                    isDisabled={wardOptions.length === 0}
                    options={wardOptions}
                    placeholder="Phường/Xã"
                    onChange={(option) => onWardSelect(option)}
                    defaultValue={selectedWard}
                />
                <textarea
                    className="outline-none px-4 py-2 bg-white"
                    type="text"
                    placeholder="Số nhà, tên đường"
                    value={descriptionAddress}
                    onChange={onChangeAddressDescription}
                />
            </div>

            <div className="flex items-center gap-x-4 justify-end">
                <button onClick={() => setIsShowFormAddAddress(false)} type="button" className="btn">
                    Thôi
                </button>
                <button type="submit" className="btn">
                    Thêm
                </button>
            </div>
        </form>
    );
}

export default LocationForm;
