import React, { Component } from 'react';
import TemplateOption from '../../ReusableComponents/TemplateOption';
import CompanyLogo from '../../ReusableComponents/CompanyLogoComponent';
import ImageComponent from '../../ReusableComponents/ImageComponent';
import TextComponent from '../../ReusableComponents/TextComponent';
import IconComponent from '../../ReusableComponents/IconSelectionComponent';


export class AU_TemplateFour extends Component {
    render() {
        return (
            <div className="template_main_container">
                {
                    !this.props.noEditMode ? 
                    <TemplateOption
                        backgroundColor={ this.props.template_data.backgroundColor }
                        displayLogo={ this.props.template_data.display_logo }
                        onTemplateItemChangeWithoutEvent={ this.props.onTemplateItemChangeWithoutEvent }
                        template_index={ this.props.template_index }
                        { ...this.props }
                    />
                    : null
                }
                <div className="template_display_area">
                    <TemplateArea { ...this.props }/>
                </div>
            </div>
        )
    }
}

export default AU_TemplateFour;

export const TemplateArea = ( props ) => {
    const backgroundColor = props.template_data.backgroundColor;
    // console.log( props.template_data );
    return (
        <div id="about_us_template_four" className="au_template_four template_main_container_display_area" style={{ backgroundColor:backgroundColor }}>
            <div className="au_template_four_top">
                <TextComponent
                    data_text={props.template_data.headline}
                    noEditMode={props.noEditMode}
                    onChange={ props.onTemplateEditorChangeHandler("headline", props.template_index) }
                    />
            </div>
            <div className="au_template_four_bottom">
                <div className="au_template_four_bottom_image_head_text_block">
                    <div className="au_template_four__image_block">
                        <ImageComponent
                            image_width={props.template_data.image_one_width}
                            image_crop={ props.template_data.image_one_crop }
                            main_src={ props.template_data.image_one_src }
                            src={ !props.template_data.image_one_cropped_src ? props.template_data.image_one_src : props.template_data.image_one_cropped_src }
                            name_normal={"image_one_src"}
                            stackClass={`image_one_src${props.template_index}`}
                            name_cropped={"image_one_cropped_src"}
                            crop_name={ "image_one_crop" }
                            noEditMode={ props.noEditMode }
                            {...props}
                        /> 
                    </div>
                    <div className="au_template_four__headline_block">
                        <TextComponent
                            data_text={props.template_data.para_one_headline}
                            noEditMode={props.noEditMode}
                            onChange={ props.onTemplateEditorChangeHandler("para_one_headline", props.template_index) }
                        />
                    </div>
                    <div className="au_template_four__text_block">
                        <TextComponent
                            data_text={props.template_data.para_one_text}
                            noEditMode={props.noEditMode}
                            onChange={ props.onTemplateEditorChangeHandler("para_one_text", props.template_index) }
                        />
                    </div>    
                </div>&emsp;
                <div className="au_template_four_bottom_image_head_text_block">
                    <div className="au_template_four__image_block">
                        <ImageComponent
                            image_width={props.template_data.image_two_width}
                            image_crop={ props.template_data.image_two_crop }
                            main_src={ props.template_data.image_two_src }
                            src={ !props.template_data.image_two_cropped_src ? props.template_data.image_two_src : props.template_data.image_two_cropped_src }
                            name_normal={"image_two_src"}
                            stackClass={`image_two_src${props.template_index}`}
                            name_cropped={"image_two_cropped_src"}
                            crop_name={ "image_two_crop" }
                            noEditMode={ props.noEditMode }
                            {...props}
                        /> 
                    </div>
                    <div className="au_template_four__headline_block">
                        <TextComponent
                            data_text={props.template_data.para_two_headline}
                            noEditMode={props.noEditMode}
                            onChange={ props.onTemplateEditorChangeHandler("para_two_headline", props.template_index) }
                        />
                    </div>
                    <div className="au_template_four__text_block">
                        <TextComponent
                            data_text={props.template_data.para_two_text}
                            noEditMode={props.noEditMode}
                            onChange={ props.onTemplateEditorChangeHandler("para_two_text", props.template_index) }
                        />
                    </div> 
                </div>&emsp;
                <div className="au_template_four_bottom_image_head_text_block">
                    <div className="au_template_four__image_block">
                        <ImageComponent
                            image_width={props.template_data.image_three_width}
                            image_crop={ props.template_data.image_three_crop }
                            main_src={ props.template_data.image_three_src }
                            src={ !props.template_data.image_three_cropped_src ? props.template_data.image_three_src : props.template_data.image_three_cropped_src }
                            name_normal={"image_three_src"}
                            stackClass={`image_three_src${props.template_index}`}
                            name_cropped={"image_three_cropped_src"}
                            crop_name={ "image_three_crop" }
                            noEditMode={ props.noEditMode }
                            {...props}
                        /> 
                    </div>
                    <div className="au_template_four__headline_block">
                        <TextComponent
                            data_text={props.template_data.para_three_headline}
                            noEditMode={props.noEditMode}
                            onChange={ props.onTemplateEditorChangeHandler("para_three_headline", props.template_index) }
                        />
                    </div>
                    <div className="au_template_four__text_block">
                        <TextComponent
                            data_text={props.template_data.para_three_text}
                            noEditMode={props.noEditMode}
                            onChange={ props.onTemplateEditorChangeHandler("para_three_text", props.template_index) }
                        />
                    </div> 
                </div>
            </div>
        </div>
    )
} 
