import React from "react"

const modal = (
    email,
    photo,
    fio,
) =>{

    return (
          <div class="row">
          <div class="col-md-4">
        <form asp-action="Create" asp-controller="Admin">

            <div class="form-group">
                <label class="control-label"></label>
                <input class="form-control" />
                <span asp-validation-for="Email" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label class="control-label"></label>
                <input class="form-control"/>
                <span asp-validation-for="Email" class="text-danger"></span>
            </div>
            <div class="form-group">
                <input type="submit" value="Створити" class="btn btn-primary" />
            </div>
        </form>
    </div>
        </div>
    );
}

export default modal