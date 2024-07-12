
$(document).ready(function () {
    /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
    var gBASE_URL = "https://pucci-mart.onrender.com/api";
    var gPriceMin = 200;
    var gPriceMax = 600;
    var gDataPetsArray = [];
    var gSTT = 1;
    var gPetId = "";
    var gPetDataTable = $("#pets-data-table").DataTable({
        data: gDataPetsArray,
        columns: [
            { data: "id" },
            { data: "type" },
            { data: "name" },
            { data: "description" },
            { data: "imageUrl" },
            { data: "price" },
            { data: "promotionPrice" },
            { data: "createdAt" },
            { data: "action" },
        ],
        columnDefs: [
            {
                targets: 0,
                render: function () {
                    return gSTT++
                }
            },
            {
                targets: 4,
                render: function (paramData) {
                    return `<img src="${paramData}" alt="" width="100px">
`
                }
            },
            {
                target: 8,
                "defaultContent": `<i class="far fa-edit text-primary" id="btn-edit-pet" style="font-size: 20px; cursor: pointer;" data-toggle="tooltip" title="Edit Pet"></i>&nbsp; 
                <i class="fas fa-trash-alt text-danger" id="btn-delete-pet" style="font-size: 20px; cursor: pointer;" title="Delete Pet" data-toggle="modal" data-target="#modal-delete-pet"></i>
                `
            },
        ]
    })
    /*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */

    $("#slider-range").slider({
        range: true,
        values: [100, 1000],
        min: 100,
        max: 1000,
        step: 5,
        slide: function (event, ui) {
            $("#min-price").html(ui.values[0]);
            gPriceMin = ui.values[0]
            $("#max-price").html(ui.values[1]);
            gPriceMax = ui.values[1]
            console.log(gPriceMin, gPriceMax)
        }
    });
    onPageLoading();
    //thực thi nút filter
    $(document).on("click", "#btn-filter", function () {
        var vPetsFilteredArr = gDataPetsArray.filter(filterPetsObj)
        if (vPetsFilteredArr.length != 0) {
            loadPetsDataToTable(vPetsFilteredArr)
        } else {
            alert("No Pet Available");
            location.reload()
        }

    });
    $(document).on("click", "#btn-add-pet", function () {
        window.location.href = "addPets.html"
    });
    $("#pets-data-table").on("click", "#btn-edit-pet", function () {
        onBtnEditPetClick(this)
    });
    $("#pets-data-table").on("click", "#btn-delete-pet", function () {
        onBtnDeletePetClick(this)
    });
    $("#modal-delete-pet").on("click", "#btn-confirm-del-pet", function () {
        $.ajax({
            type: 'delete',
            url: gBASE_URL + '/pets/' + gPetId,
            dataType: 'json',
            success: function (paramData) {
                console.log(paramData);
                alert("Xóa thú cưng với id: " + gPetId + "thành công")
                location.reload()
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onPageLoading() {
    callApiToGetPetsList()
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
//hàm họi api lấy danh sách thú cưng
function callApiToGetPetsList() {
    $.ajax({
        url: gBASE_URL + "/pets",
        type: "GET",
        success: function (paramRes) {
            console.log(paramRes);
            gDataPetsArray = paramRes.rows;
            gPetDataTable.rows.add(gDataPetsArray);
            gPetDataTable.draw()
        },
        error: function (paramError) {
            console.log(paramError.reponseText)
        }
    });
}
//hàm filter pet
function filterPetsObj(paramPetsElement) {
    return paramPetsElement.price >= gPriceMin && paramPetsElement.price <= gPriceMax
};
//hàm load data to table
function loadPetsDataToTable(paramPetsDataObj) {
    gPetDataTable.clear();
    gPetDataTable.rows.add(paramPetsDataObj);
    gPetDataTable.draw()
};
//hàm ấn nút edit pet:
function onBtnEditPetClick(paramBtn) {
    var vRowTable = $(paramBtn).parents("tr");
    var vDataTableRow = gPetDataTable.row(vRowTable);
    var vPetData = vDataTableRow.data()
    gPetId = vPetData.id;
    var vEditUrl = "editPets.html";
    var vOpenEditUrl = vEditUrl +
        "?id=" + gPetId;
    window.location.href = vOpenEditUrl
};
//hàm ấn nút delete pet:
function onBtnDeletePetClick(paramBtn) {
    var vRowTable = $(paramBtn).parents("tr");
    var vDataTableRow = gPetDataTable.row(vRowTable);
    var vPetData = vDataTableRow.data()
    gPetId = vPetData.id;

}


