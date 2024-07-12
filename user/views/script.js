var gBASE_URL = "https://pucci-mart.onrender.com/api";
var gPerpage = 8;

var gTotalPages = Math.ceil(30 / gPerpage);
$(document).ready(function () {
    onPageLoading()
});
//function on page loading
function onPageLoading() {
    makecall(0);
    // callApiToGetPetList()
}
//hàm call api lấy danh sách pet
function callApiToGetPetList(paramgPerpage, paramPageNum) {
    const vQueryParams = new URLSearchParams({
        "_limit": paramgPerpage,
        "_page": paramPageNum
    });
    $.ajax({
        url: gBASE_URL + '/pets?' + vQueryParams.toString(),
        type: "GET",
        success: function (paramRes) {
            console.log(paramRes);
            loadPetCardToUi(paramRes);
        },
        error: function (paramError) {
            console.log(paramError.responseText);
        }
    })
};

function createpagination(vPagenum) {
    // $(".paging-next").attr("onclick", `makecall(${vPagenum + 1})`);
    // $(".paging-previous").attr("onclick");
    // Nếu tran hiện tại là trang 1 thì nút Prev sẽ bị disable
    if (vPagenum == 0) {
        $(".paging-previous").removeAttr("onclick");
    } else {
        $(".paging-previous").attr("onclick", `makecall(${vPagenum - 1})`);
    }

    // Nếu tran hiện tại là trang cuối cùng thì nút Next sẽ bị disable
    if (vPagenum == gTotalPages-1) {
        $(".paging-next").removeAttr("onclick");
    } else {
        $(".paging-next").attr("onclick", `makecall(${vPagenum + 1})`);
    }
}

//hàm load danh sách vật nuôi lên browser
function loadPetCardToUi(paramPetListObj) {
    $("#pet-cards").html("");
    for (var bI = 0; bI < paramPetListObj.rows.length; bI++) {
        var vPet = paramPetListObj.rows[bI];
        var divCard = $("<div>").html(`
            <div class="col-lg-3 div-pet-card ">
            <div class="">
                <div class="card mt-2 mb-3" style="width: 15rem; position: relative; border:none; max-height: max-content; ">
                    <div><img class="card-img-top" src="${vPet.imageUrl}" >
                        <div class="discount">
                            <span>-10%</span>
                        </div>
                    </div>

                    <div class="card-body text-center" style="height: fit-content;">
                        <h5 class="card-title mb-0">${vPet.name}</h5>
                        <p class="card-text text-secondary mb-0">${vPet.description}</p>
                        <div class="row justify-content-center">
                            <p class="text-secondary">$${vPet.promotionPrice}</p>
                            <p class="ml-2 text-secondary" style="text-decoration:1px line-through black;">$${vPet.price}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>`).css("height", "fit-content").appendTo("#pet-cards");


    }
}


function makecall(vPagenum) {

    // Hàm tạo thanh phân trang
    createpagination(vPagenum);

    // Hàm hiển thị dữ liệu dựa vào 2 tham số phân trang
    callApiToGetPetList(gPerpage, vPagenum);
}