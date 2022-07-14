export function Address(descriptionAddress, ward, district, city) {
    this.descriptionAddress = descriptionAddress;
    this.ward = ward;
    this.district = district;
    this.city = city;

    this.getAddress = function () {
        return `${this.descriptionAddress}, ${this.ward}, ${this.district}, ${this.city}`;
    };
}
